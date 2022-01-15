const HDWalletProvider = require('@truffle/hdwallet-provider') // helps to setup a provider and unlock our account
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
	'account mnemonic',
	'https://rinkeby.infura.io/v3/cfde4e8318514308bbad06c2fd4681ed'
)

const web3 = new Web3(provider) //creating a new instance of web3

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attempting to deploy from Account', accounts[0])

	const contract = await new web3.eth.Contract(JSON.parse(abi)) //creating contract instance
		.deploy({
			data: evm.bytecode.object,
			arguments: ['GM!'],
		})
		.send({ gas: '1000000', from: accounts[0] })

	console.log('contract deployed to ', contract.options.address)
	provider.engine.stop()
}
deploy()
// https://rinkeby.infura.io/v3/cfde4e8318514308bbad06c2fd4681ed
// 0x436475159886f54686887c9c6Ba30EC396d02fDd
// contract address: 0xEdBC95b4ef0bC8d21523012472A36Ee69a4b2F14
