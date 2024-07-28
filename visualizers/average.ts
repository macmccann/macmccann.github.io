// Higher rates make the average follow the immediate value more closely.
type AverageConfig = {
    rateUp: number;
    rateDown: number;
};

export default class Average {
    static average(
        avgArray: Float32Array,
        immArray: Float32Array,
        { rateUp, rateDown }: AverageConfig
    ): Float32Array {
        console.assert(avgArray.length === immArray.length);
        const result = new Float32Array(avgArray.length);
        for (let i = 0; i < avgArray.length; i++) {
            if (avgArray[i] > immArray[i]) {
                result[i] = avgArray[i] * (1 - rateUp) + immArray[i] * rateUp;
            } else {
                result[i] =
                    avgArray[i] * (1 - rateDown) + immArray[i] * rateDown;
            }
        }
        return result;
    }
}
