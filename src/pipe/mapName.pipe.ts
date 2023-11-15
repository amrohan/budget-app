import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map',
})
export class MapPipe implements PipeTransform {

    transform(value: any, key: string): any {
        const valueForKey = value[key];
        return valueForKey.split(' ')[0];
    }
}