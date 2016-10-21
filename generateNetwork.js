const { Neuron, Layer, Network, Trainer, Architect } = require("synaptic");
const fs = require("fs");
const close = require("./close");

const prices = [];

for(let key in close.bpi) {
	prices.push(close.bpi[key]);
}

fs.writeFileSync(__dirname + "/prices.json", JSON.stringify(prices, null, "\t"));

const normal = Math.max(...prices);

const network = new Architect.Perceptron(2, 3, 1);
const trainer = new Trainer(network);

const trainingSet = [];

for(let i = 0; i < prices.length - 2; i++) {
	trainingSet.push({
		input: [ prices[i] / normal, prices[i + 1] / normal ],
		output: [ prices[i + 2] / normal ]
	});
}

fs.writeFileSync(__dirname + "/trainingset.json", JSON.stringify(trainingSet, null, "\t"));

trainer.train(trainingSet.slice(-100, -200), {
	rate: .1,
	iterations: 20000,
	error: .1,
	shuffle: true,
	log: 1000,
	cost: Trainer.cost.CROSS_ENTROPY
});

fs.writeFileSync(__dirname + "/net.json", JSON.stringify({ normal, network }, null, "\t"));
