export class ListPartnerDTO {
  constructor(
    readonly id: string, 
    readonly name: string,
    readonly email: string, 
    readonly description: string,
    readonly repositoryGit: string,
    readonly urlDoc: string,  
  ) {}
}