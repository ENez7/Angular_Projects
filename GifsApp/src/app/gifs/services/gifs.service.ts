import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifList: Gif[] = [];

    private _tagHistory: string[] = [];
    private apiKey: string = '';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagHistory() {
        return [...this._tagHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase();
        // Filter repeated tags
        if (this._tagHistory.includes(tag)) {
            this._tagHistory = this._tagHistory.filter(t => t !== tag);
        }
        // Add tag to the beginning of the array
        this._tagHistory.unshift(tag);
        // Limit the array to 10 elements
        this._tagHistory = this._tagHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage(): void {
        const temp = localStorage.getItem('history');
        if (!temp) return;
        this._tagHistory = JSON.parse(temp);
        this.searchTag(this._tagHistory[0]);
    }

    public searchTag(tag: string): void {
        if (tag.trim().length === 0) return;
        this.organizeHistory(tag);

        // fetch('https://api.giphy.com/v1/gifs/search?api_key=CsSDniWX8HwUSHFX8xBWPFsSVD4zCTeW&q=sponge_bob&limit=1')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data));

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag);

        // This is an observable
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(resp => {
                this.gifList = resp.data;
            });
    }
}