interface ListPartnerClientsDTO {
  name: string;
}

interface ListPartnerProjectsDTO {
  name: string
}

export class ListPartnerDTO {
  constructor(
    readonly id: string, 
    readonly name: string, 
    readonly email: string,
    readonly clients: ListPartnerClientsDTO[],
    readonly projects: ListPartnerProjectsDTO[], 
    
  ) {}
}