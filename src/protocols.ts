import { Credential, Network } from '@prisma/client';

export type SignUser = {
  email: string;
  password: string;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type DeleteProcess = {
  id: number;
};

export type NetworkParams = Omit<Network, 'id'>;

export type CredentialParams = Omit<Credential, 'id'>;

export type CredentialBodyParams = Omit<Credential, 'id' | 'userId'>;
