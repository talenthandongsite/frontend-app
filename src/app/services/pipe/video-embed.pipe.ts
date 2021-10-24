import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const YOUTUBE_SAFE = 'youtu.be';
const YOUTUBE_WATCH = 'youtube.com/watch';
const YOUTUBE_EMBED = 'youtube.com/embed';

@Pipe({ name: 'videoEmbed' })
export class VideoEmbedPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        const sanitized = this.sanitizer.sanitize(SecurityContext.URL, url);
        if (sanitized.match(YOUTUBE_SAFE)) {
            const composedUrl = 'https://youtube.com/embed/' + sanitized.split('/')[3];
            return this.sanitizer.bypassSecurityTrustResourceUrl(composedUrl);
        } else if (sanitized.match(YOUTUBE_WATCH)) {
            const key = sanitized.split('?')[1].split('&')[0].split('=')[1];
            const composedUrl = 'https://youtube.com/embed/' + key;
            return this.sanitizer.bypassSecurityTrustResourceUrl(composedUrl);
        } else if (sanitized.match(YOUTUBE_EMBED)) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(sanitized);
        } else {
            return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        }
    }
}