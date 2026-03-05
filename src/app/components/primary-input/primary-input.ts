import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Component, forwardRef, Input, input } from '@angular/core';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-primary-input',
  imports: [ɵInternalFormsSharedModule,
    ReactiveFormsModule
  ],

  providers: [
    {provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => PrimaryInput),
     multi: true
    }
  ],

  templateUrl: './primary-input.html',
  styleUrl: './primary-input.css',
})
export class PrimaryInput implements ControlValueAccessor {



  @Input () type: InputTypes = "text"
  @Input () placeholder: string = ""
  @Input () label: string = ""
  @Input () inputName: string = ""



  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

    registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
}
