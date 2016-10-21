const { Neuron, Layer, Network, Trainer, Architect } = require("synaptic");
const fs = require("fs");
const net = require("./net");
const prices = require("./prices").slice(-100);

const { normal } = net;
const network = Network.fromJSON(net.network);

function predictPrice(y, t) {
	return network.activate([ y / normal, t / normal])[0] * normal;
}

for(let i = 0; i < prices.length - 2; i++) {
	console.log(predictPrice(prices[i], prices[i + 1]) + " " + prices[i + 2]);
}

console.log(predictPrice(627.8, 631.8));
