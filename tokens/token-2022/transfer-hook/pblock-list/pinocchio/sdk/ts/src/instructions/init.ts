/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { findConfigPda } from '../pdas';
import { BLOCK_LIST_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INIT_DISCRIMINATOR = 241;

export function getInitDiscriminatorBytes() {
  return getU8Encoder().encode(INIT_DISCRIMINATOR);
}

export type InitInstruction<
  TProgram extends string = typeof BLOCK_LIST_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountConfig extends string
        ? WritableAccount<TAccountConfig>
        : TAccountConfig,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitInstructionData = { discriminator: number };

export type InitInstructionDataArgs = {};

export function getInitInstructionDataEncoder(): Encoder<InitInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 241 })
  );
}

export function getInitInstructionDataDecoder(): Decoder<InitInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getInitInstructionDataCodec(): Codec<
  InitInstructionDataArgs,
  InitInstructionData
> {
  return combineCodec(
    getInitInstructionDataEncoder(),
    getInitInstructionDataDecoder()
  );
}

export type InitAsyncInput<
  TAccountAuthority extends string = string,
  TAccountConfig extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  config?: Address<TAccountConfig>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export async function getInitInstructionAsync<
  TAccountAuthority extends string,
  TAccountConfig extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BLOCK_LIST_PROGRAM_ADDRESS,
>(
  input: InitAsyncInput<
    TAccountAuthority,
    TAccountConfig,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  InitInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountSystemProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? BLOCK_LIST_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    config: { value: input.config ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.config.value) {
    accounts.config.value = await findConfigPda();
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitInstructionDataEncoder().encode({}),
  } as InitInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountSystemProgram
  >;

  return instruction;
}

export type InitInput<
  TAccountAuthority extends string = string,
  TAccountConfig extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  config: Address<TAccountConfig>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getInitInstruction<
  TAccountAuthority extends string,
  TAccountConfig extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BLOCK_LIST_PROGRAM_ADDRESS,
>(
  input: InitInput<TAccountAuthority, TAccountConfig, TAccountSystemProgram>,
  config?: { programAddress?: TProgramAddress }
): InitInstruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountConfig,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? BLOCK_LIST_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    config: { value: input.config ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitInstructionDataEncoder().encode({}),
  } as InitInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitInstruction<
  TProgram extends string = typeof BLOCK_LIST_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    authority: TAccountMetas[0];
    config: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
  };
  data: InitInstructionData;
};

export function parseInitInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      config: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitInstructionDataDecoder().decode(instruction.data),
  };
}
