import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

export default function SendSui() {
  const { mutateAsync: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransaction();
  const [Digest, SetDigest] = useState("");

  function sendMessage() {
    const txb = new Transaction();

    const coin = txb.splitCoins(txb.gas, [100]);
    txb.transferObjects(
      [coin],
      "0x30e426d5ae29e02229c1352ef5b46f42d188e2c42bfcf70fe74bd33286f0719d",
    );

    signAndExecuteTransactionBlock({
      transaction: txb,
    }).then(async (result) => {
      alert("Sui sent successfully");
      SetDigest(result.digest);
    });
  }

  return (
    <div>
      {
        <div>
          <button onClick={() => sendMessage()}>Send me Sui!</button>
          <div>Digest: {Digest}</div>
        </div>
      }
    </div>
  );
}
