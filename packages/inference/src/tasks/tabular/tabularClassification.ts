import { getProviderHelper } from "../../lib/getProviderHelper";
import type { BaseArgs, Options } from "../../types";
import { innerRequest } from "../../utils/request";

export type TabularClassificationArgs = BaseArgs & {
	inputs: {
		/**
		 * A table of data represented as a dict of list where entries are headers and the lists are all the values, all lists must have the same size.
		 */
		data: Record<string, string[]>;
	};
};

/**
 * A list of predicted labels for each row
 */
export type TabularClassificationOutput = number[];

/**
 * Predicts target label for a given set of features in tabular form.
 * Typically, you will want to train a classification model on your training data and use it with your new data of the same format.
 * Example model: vvmnnnkv/wine-quality
 */
export async function tabularClassification(
	args: TabularClassificationArgs,
	options?: Options
): Promise<TabularClassificationOutput> {
	const providerHelper = getProviderHelper(args.provider ?? "hf-inference", "tabular-classification");
	const { data: res } = await innerRequest<TabularClassificationOutput>(args, providerHelper, {
		...options,
		task: "tabular-classification",
	});
	return providerHelper.getResponse(res);
}
