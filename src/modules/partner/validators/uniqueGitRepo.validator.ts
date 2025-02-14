import { Injectable } from '@nestjs/common';
import { PartnerService } from '../partner.service';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueGitRepoValidator implements ValidatorConstraintInterface{

  constructor(private partnerService: PartnerService) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const exists = await this.partnerService.exitsWithGitRepo(value)
    return !exists
  }
}

export const GitRepoIsUnique = (optionsValidations: ValidationOptions) => {
  return (obj: Object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: optionsValidations,
      constraints: [],
      validator: UniqueGitRepoValidator
    });
  }
}