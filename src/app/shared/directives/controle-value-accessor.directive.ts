import { Directive, Inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[appControleValueAccessor]',
  standalone: true
})
export class ControleValueAccessorDirective<T>
implements ControlValueAccessor, OnInit
{
controle: FormControl | undefined;
isRequired: boolean = false;
private _isDisabled: boolean = false;
private _destroy$ = new Subject<void>();
private _onTouched!: () => T;
constructor(@Inject(Injector) private injector: Injector) {}
ngOnInit(): void {
  this.setFormControl();

  this.isRequired = this.controle?.hasValidator(Validators.required) ?? false;
}
setFormControl() {
  try {
    const formControle = this.injector.get(NgControl);
    switch (formControle.constructor) {
      case FormControlName:
        this.controle = this.injector
          .get(FormGroupDirective)
          .getControl(formControle as FormControlName);
        break;
      default:
        this.controle = (formControle as FormControlDirective)
          .form as FormControl;
        break;
    }
  } catch (err) {
    this.controle = new FormControl();
  }
}
writeValue(value: T): void {
  this.controle ? this.controle.setValue(value) : new FormControl(value);
}
registerOnChange(fn: (val: T | null) => T): void {
  this.controle?.valueChanges
    .pipe(
      takeUntil(this._destroy$),
      startWith(this.controle.value),
      distinctUntilChanged(),
      tap((val) => fn(val))
    )
    .subscribe(() => this.controle?.markAsUntouched());
}
registerOnTouched(fn: () => T): void {
  this._onTouched = fn;
}
setDisabledState?(isDisabled: boolean): void {
  this._isDisabled = isDisabled;
}
}
