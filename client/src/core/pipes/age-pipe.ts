import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "age",
})
export class AgePipe implements PipeTransform {
  transform(value: string): unknown {
    const today = new Date();
    const birthday = new Date(value);

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    return age;
  }
}
