import { Character } from '../interfaces/character.interface';
import { DbService } from '../services/db.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dbz-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent{
    // Esto es DI
    constructor( private dbService: DbService ) {}

    get characters(): Character[] {
        return [...this.dbService.mainPageCharacters];
    }

    onDeleteCharacter( id: string): void {
        this.dbService.deleteCharacterById( id );
    }

    onNewCharacter( character: Character): void {
        this.dbService.addCharacter( character );
    }
}