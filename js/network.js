import lerp from "../utils/lerp.js";

class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = []; // array of levels
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            // create a new level
            this.levels[i] = new Level(neuronCounts[i], neuronCounts[i + 1]);
        }
    }

    // feedforward algorithm as well
    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(
            givenInputs, network.levels[0]);
        // loop through remaining levels
        // putting in output of previous level as the input of the next level
        // these outputs will tell us if car will move forward backward left or right
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, amount = 1) {
        // go through all levels of the network and mutate them
        network.levels.forEach(level => {
            // iterate through all the biases and weights and mutate them
            for (let i = 0; i < level.biases.length; i++) {
                // mutate the bias
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                )
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    )
                }
            }
        });
    }
}

// this file will configure the neural network to train the car to move on the road
// level class to train the car
class Level {
    constructor(inputCount, outputCount) {
        // each level has a set of inputs and outputs
        // array pf inputs
        this.inputs = new Array(inputCount);

        // array of outputs
        this.outputs = new Array(outputCount);

        // each value has a bias value to it
        this.biases = new Array(outputCount);

        // need to connect every input to every output with a weight
        this.weights = [];
        // going through all of the inputs...
        for (let i = 0; i < inputCount; i++) {
            // ...and for each input we need to create an array of weights
            // each input node will have output nodes and each output node will have a weight
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    // static method to randomize the level so we can serialize it and save it to a file
    static #randomize(level) {
        // given a level we want to go through the input and in each put through each output
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                // for every input/output pair we want to randomize the weight
                level.weights[i][j] = Math.random() * 2 - 1; // random number between -1 and 1
            }
        }

        // biases will be in the same range but why negative values? negative weight will lead to a negative output and a positive weight will lead to a positive output
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }

    }

    // static method to feed forward the inputs and get the outputs
    // this algorithm will be used to train the car to move on the road
    // this will work... but it will not be very good
    // this is because the weights and biases are random
    // we need to train the network to get the car to move on the road
    // we will do this by using a genetic algorithm
    // we will create a population of networks and then we will select the best ones and breed them together to create a new population
    // we will then repeat this process until we get a network that can move on the road

    static feedForward(givenInputs, level) {
        // loop through all the level inputs and set to given inputs (values from the sensors)
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        // to get the outputs need to loop through the outputs
        for (let i = 0; i < level.outputs.length; i++) {
            // need to calculate some sum for the value of the inputs and the weights
            let sum = 0;
            // loop through the inputs
            for (let j = 0; j < level.inputs.length; j++) {
                // add the input times the weight to the sum
                sum += level.inputs[j] * level.weights[j][i];
            }

            if (sum > level.biases[i]) {
                // if so then set output to 1
                level.outputs[i] = 1;
            } else {
                // else set output to 0
                level.outputs[i] = 0;
            }
        }
        return level.outputs; // return the outputs of the level (the car's movement)
    }
}

export default NeuralNetwork;