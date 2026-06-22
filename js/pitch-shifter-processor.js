class PitchShifterProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [];
  }

  constructor() {
    super();
    this.pitchRatio = 1.0;

    this.port.onmessage = (e) => {
      if (e.data && e.data.pitchRatio !== undefined) {
        this.pitchRatio = e.data.pitchRatio;
      }
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    if (
      !input ||
      input.length === 0 ||
      !input[0] ||
      !output ||
      output.length === 0 ||
      !output[0]
    ) {
      return true;
    }

    const numChannels = Math.min(input.length, output.length);
    const bufferLength = input[0].length;

    for (let channel = 0; channel < numChannels; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      let readPos = 0;

      for (let i = 0; i < outputChannel.length; i++) {
        const idx = Math.floor(readPos);
        const next = Math.min(idx + 1, bufferLength - 1);
        const frac = readPos - idx;

        outputChannel[i] =
          inputChannel[idx] + (inputChannel[next] - inputChannel[idx]) * frac;

        readPos += this.pitchRatio;

        if (readPos >= bufferLength) {
          readPos -= bufferLength;
        }
      }
    }

    return true;
  }
}

registerProcessor("pitch-shifter", PitchShifterProcessor);
