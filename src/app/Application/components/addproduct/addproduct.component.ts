import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../enum/category';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  produits: Product[] = [];
  lesCategorie = Object.values(Category);
  produitForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    libelle: new FormControl('A', { nonNullable: true }),
    prix: new FormControl(10000, { nonNullable: true }),
    madeIn: new FormControl('Tunisie', { nonNullable: true }),
    categorie: new FormControl(Category.Accessoires, { nonNullable: true }),
    nouveau: new FormControl(true, { nonNullable: true }),
  });
  constructor(private productservice: ProductService) {}
  onSubmitForm() {
    // console.log(this.produitForm.value);
    // console.log(this.produitForm.get('id')?.value);
    // console.log(this.produitForm.controls['libelle']);
    // console.log(this.produitForm.value['madeIn']);
    this.productservice
      .addProduit(this.produitForm.value as Product)
      .subscribe({
        next: (product) => {
          this.produits.push(product);
        },
      });
  }
  onResetForm() {
    this.produitForm.reset();
  }
  ngOnInit(): void {
    this.productservice.getProducts().subscribe({
      next: (data) => {
        this.produits = data;
      },
    });
  }
}
