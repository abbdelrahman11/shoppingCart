import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

    getAllProducts(){
     return this.http.get("http://fakestoreapi.com/products")
    }
    getAllCatogories(){
      return this.http.get("https://fakestoreapi.com/products/categories")
    }
    getProductsByCatogories(keyword:string){
      return this.http.get("https://fakestoreapi.com/products/category/"+keyword)
    }
    getProductsByID(id:any){
      return this.http.get("https://fakestoreapi.com/products/"+id)
    }
}
