import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Hero, Publisher } from "../../interfaces/hero.interface";
import { HeroesService } from "../../services/heroes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, switchMap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styleUrls: ['./add-hero-page.component.css']
})
export class AddHeroPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });
  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero)

      return
    });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`);
        });

      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`${hero.superhero} created!`)

        this.router.navigate(['/heroes/edit', hero.id])
      });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'done', {duration: 2500});
  }

  onDeleteHero() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter(wasDeleted => wasDeleted),
      ).subscribe(() => {
      this.router.navigate(['/heroes'])
    });


    /*dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.heroesService.deleteHero(this.currentHero.id)
        .subscribe(wasDeleted => {
          if (wasDeleted)

          this.router.navigate(['/heroes'])
        });
    });*/
  }
}
