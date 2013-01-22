var requireConfig = {
    baseUrl: "/test/Source/js",
    paths: {
		Moq:"/test/Specs/Moq"
    }
};

require.config(
	moquire.config(requireConfig)
);