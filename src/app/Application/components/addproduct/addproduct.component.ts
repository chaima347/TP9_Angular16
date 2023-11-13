import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  // produitForm = new FormGroup({
  //   id: new FormControl(0, { nonNullable: true }),
  //   libelle: new FormControl('A', { nonNullable: true }),
  //   prix: new FormControl(10000, { nonNullable: true }),
  //   madeIn: new FormControl('Tunisie', { nonNullable: true }),
  //   categorie: new FormControl(Category.Accessoires, { nonNullable: true }),
  //   nouveau: new FormControl(true, { nonNullable: true }),
  // });
  produitForm!: FormGroup;
  constructor(
    private productservice: ProductService,
    private fb: FormBuilder
  ) {}
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
    this.produitForm.get('madeIn')?.setValue('Autres');
    this.produitForm.get('categorie')?.setValue(Category.Fourniture);
  }
  ngOnInit(): void {
    this.produitForm = this.fb.nonNullable.group({
      id: [0],
      libelle: [''],
      prix: [2000],
      madeIn: ['tunisia'],
      categorie: [Category.Accessoires],
      nouveau: [true],
    });

    this.productservice.getProducts().subscribe({
      next: (data) => {
        this.produits = data;
      },
    });
    // code pour set value
    this.produitForm.get('nouveau')?.setValue(false);
    // code  de valuechanges
    this.produitForm
      .get('libelle')
      ?.valueChanges.subscribe((data) => console.log(data));
  }
}
