import _ from "lodash";
import Web3 from "web3";
import AbiData from "./ABI/artifacts/contracts/JIRA.sol/JIRA.json";
import Address from "./Address/Address.json";
import { WEB3_PROVIDER_URL, WALLET_PRIVATE_KEY } from "../config";

const ABI = AbiData?.abi;

export const getcurrentNetworkId = async () => {
  const networkId = await web3?.eth?.accounts?._ethereumCall?.getNetworkId();
  return networkId;
};

export const getContractAddress = () => {
  return Address;
};

const getContract = async (web3) => {
  const networkId = await web3?.eth?.accounts?._ethereumCall?.getNetworkId();
  sessionStorage.setItem("currentyNetwork", networkId);
  const ADDRESS = getContractAddress();
  const contract = ADDRESS && new web3.eth.Contract(ABI, ADDRESS);
  return contract;
};

export const _transction_signed_with_provider = async (service, ...props) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));

  const signer = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
  const ADDRESS = getContractAddress();

  web3.eth.accounts.wallet.add(signer);
  const contract = new web3.eth.Contract(ABI, ADDRESS);
  const callService = _.get(contract, ["methods", service]);
  const tx = callService(...props);
  const responseData = await tx
    .send({
      from: signer.address,
      // gas: await tx.estimateGas(),
      gas: "4700000",
      value: 0,
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
      return txhash;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _transction_with_wallet = async (service, ...props) => {
  window?.ethereum?.request({
    method: "eth_requestAccounts",
  });

  const web3 = new Web3(window.ethereum);
  const callService = _.get(await getContract(web3), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      value: 0,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _paid_transction_with_wallet = async (cost, service, ...props) => {
  window?.ethereum?.request({
    method: "eth_requestAccounts",
  });

  const web3 = new Web3(window.ethereum);
  const callService = _.get(await getContract(web3), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      value: cost,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _account = async () => {
  window?.ethereum?.request({
    method: "eth_requestAccounts",
  });

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const _fetch_with_wallet = async (service, ...props) => {
  window?.ethereum?.request({
    method: "eth_requestAccounts",
  });

  const web3 = new Web3(window.ethereum);
  const callService = _.get(await getContract(web3), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  let data;
  if (props) {
    data = await callService(...props).call({ from: accounts[0] });
  } else {
    data = await callService().call({ from: accounts[0] });
  }

  return data;
};

export const _fetch_with_provider = async (service, ...props) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));

  const callService = _.get(await getContract(web3), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  let data;
  if (props) {
    data = await callService(...props).call({ from: accounts[0] });
  } else {
    data = await callService().call({ from: accounts[0] });
  }

  return data;
};
