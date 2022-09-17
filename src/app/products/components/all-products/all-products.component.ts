import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: any = [];
  catogorie: any = [];
  Loading: boolean = false;
  cartProducts: any[] = [];
  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getcatogires();
  }
  getProducts() {
    this.Loading = true;
    this.service.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.Loading = false;
      },
      (error) => {
        console.log(error.message);
        this.Loading = false;
      }
    );
  }
  getcatogires() {
    this.Loading = true;
    this.service.getAllCatogories().subscribe(
      (res) => {
        this.Loading = false;
        this.catogorie = res;
      },
      (error) => {
        console.log(error.message);
        this.Loading = false;
      }
    );
  }

  filterByCatogorie(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getProducts();
    } else {
      this.getProductsByCatogory(value);
    }
  }
  getProductsByCatogory(keyword: string) {
    this.Loading = true;
    this.service.getProductsByCatogories(keyword).subscribe(
      (res) => {
        this.Loading = false;
        this.products = res;
      },
      (error) => {
        console.log(error.message);
        this.Loading = false;
      }
    );
  }

  AddToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.item.id == event.item.id
      );
      if (exist) {
        alert('product already there');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
