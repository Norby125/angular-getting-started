import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public pageTitle: string = 'Product List';
  public imageWidth: number = 50;
  public imageMargin: number = 2;
  public showImage: boolean = false;
  public products: IProduct[];
  private _filterBy: string;
  public errorMessage: string;
  public get filterBy(): string{
    return this._filterBy;
  }
  public set filterBy(value: string){
    this._filterBy = value;
    this.filteredProducts = this.filterBy ? this.performFilter(this.filterBy) : this.products;
  }
  public filteredProducts = [];
  constructor(private _productService: ProductService) { 
  }

  ngOnInit() {
    this._productService.getProducts()
        .subscribe(
          products => {
            this.products= products;
            this.filteredProducts = this.products;
          },
          error => this.errorMessage = <any>error);
  }

  public toogleImage(){
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter( (x: IProduct) => x.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  public onRatingClicked(message: string): void{
    this.pageTitle = `Product List: ${message}`;
  }


}
