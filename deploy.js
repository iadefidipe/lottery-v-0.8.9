const HDWalletProvider = require('@truffle/hdwallet-provider') // helps to setup a provider and unlock our account
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
	'account mnemonic',
	'infura link'
)

const web3 = new Web3(provider) //creating a new instance of web3

const deploy = async () => {
	const accounts = await web3.eth.getAccounts()

	console.log('Attempting to deploy from Account', accounts[1])

	const contract = await new web3.eth.Contract(abi) //creating contract instance
		.deploy({
			data: evm.bytecode.object
		})
		.send({ gas: '1000000', from: accounts[1] })

	console.log('contract deployed to ', contract.options.address)
	console.log('ABI', abi)

	provider.engine.stop()
}
deploy()
