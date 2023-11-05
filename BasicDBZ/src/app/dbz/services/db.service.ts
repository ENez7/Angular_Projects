import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    public mainPageCharacters: Character[] = [{
        id: uuid(),
        name: 'Krillin',
        power: 1000,
    },{
        id: uuid(),
        name: 'Goku',
        power: 9500,
    },{
        id: uuid(),
        name: 'Vegeta',
        power: 7500,
    }];

    addCharacter(character: Character): void {
        const newCharacter: Character = {
            ...character,
            id: uuid(),
        };        
        
        this.mainPageCharacters.push(newCharacter);
        // unshift al inicio
    }

    // onDeleteCharacter(index: number): void {
    //     this.mainPageCharacters.splice(index, 1);
    //     console.log(this.mainPageCharacters);
    // }

    deleteCharacterById( id: string ): void {
        this.mainPageCharacters = this.mainPageCharacters.filter( c => c.id !== id );
    }
}