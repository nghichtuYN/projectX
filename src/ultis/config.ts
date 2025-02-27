import { PinataSDK } from "pinata-web3";

export async function getPinata() {
  return new PinataSDK({
    pinataJwt: process.env.PINATA_SECRET_JWT!,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  });
}
