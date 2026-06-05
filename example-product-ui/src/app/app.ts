import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import JsBarcode from 'jsbarcode';

interface ProductCode {
  id: number;
  code: string;
  createdDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {

  @ViewChildren('barcodeSvg') barcodeSvgs!: QueryList<ElementRef<SVGElement>>;

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  apiUrl = 'http://localhost:5292/api/ProductCodes';

  productCode = '';
  productCodes: ProductCode[] = [];
  errorMessage = '';

  showDeleteModal = false;
  selectedDeleteItem: ProductCode | null = null;

  ngOnInit(): void {
    this.loadProductCodes();
  }

  loadProductCodes(): void {
    this.http.get<ProductCode[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('GET DATA:', data);

        this.productCodes = [...data]; // สำคัญ
        this.cdr.detectChanges();      // สำคัญ

        setTimeout(() => {
          this.generateBarcodes();
        }, 100);
      },
      error: () => {
        this.errorMessage = 'Cannot load product codes.';
      }
    });
  }

  addProductCode(): void {
    this.errorMessage = '';
    this.productCode = this.productCode.trim().toUpperCase();

    const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

    if (!pattern.test(this.productCode)) {
      this.errorMessage = 'กรุณากรอกรหัสสินค้าในรูปแบบ XXXX-XXXX-XXXX-XXXX และใช้เฉพาะ A-Z, 0-9 เท่านั้น';
      return;
    }

    this.http.post<ProductCode>(this.apiUrl, {
      code: this.productCode
    }).subscribe({
      next: () => {
        this.productCode = '';
        this.loadProductCodes();
      },
      error: (err) => {
        this.errorMessage = err.error || 'Cannot add product code.';
      }
    });
  }

  openDeleteModal(item: ProductCode): void {
    this.selectedDeleteItem = item;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.selectedDeleteItem = null;
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (!this.selectedDeleteItem) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.selectedDeleteItem.id}`).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadProductCodes();
      },
      error: () => {
        this.errorMessage = 'Cannot delete product code.';
      }
    });
  }

  generateBarcodes(): void {
    console.log('Barcode Count:', this.barcodeSvgs.length);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      this.barcodeSvgs.forEach((barcodeRef) => {
        const svg = barcodeRef.nativeElement;
        const code = svg.getAttribute('data-code');

        if (!code) return;

        svg.innerHTML = '';

        JsBarcode(svg, code, {
          format: 'CODE39',
          displayValue: false,
          width: 1.3,
          height: 28,
          margin: 0
        });
      });
    }, 0);
  }

  ngAfterViewInit(): void {
    this.barcodeSvgs.changes.subscribe(() => {
      this.generateBarcodes();
    });
  }
}