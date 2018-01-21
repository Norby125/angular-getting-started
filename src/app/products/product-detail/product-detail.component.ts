import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public pageTitle: string = 'Product Detail';
  public product: IProduct;
  public errorMessage: string;
  public products: IProduct[];
  constructor(private _router: Router, private _route: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this._productService.getProducts()
      .subscribe(
      products => this.product = products.find(x => x.productId === id),
      error => <any>this.errorMessage
      );
  }
  public onBack(): void{
    this._router.navigate(['products']);
  }

}
