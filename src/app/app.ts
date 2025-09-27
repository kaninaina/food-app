import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import translationsEN from '../../public/i18n/en.json';
import translationsAR from '../../public/i18n/ar.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private translate: TranslateService, private renderer: Renderer2) {
    const browserLang = navigator.language.split('-')[0];
    this.translate.addLangs(['en', 'ar']);
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('ar', translationsAR);
    this.translate.setFallbackLang('en');

    const selectedLang = browserLang.match(/en|ar/) ? browserLang : 'en';
    this.translate.use(selectedLang);

    this.updateDirection(selectedLang);
  }

  updateDirection(lang: string) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(document.body, 'dir', dir);
  }
}
