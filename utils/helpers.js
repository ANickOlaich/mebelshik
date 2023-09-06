//helper functions here
module.exports = {
    // this utility helps the collection render in rows of 6
    grouped_each: (every, context, options) => {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    }
}


