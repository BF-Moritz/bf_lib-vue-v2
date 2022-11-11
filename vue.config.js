module.exports = {
	pluginOptions: {
		electronBuilder: {
			// Use this to change the entrypoint of your app's main process
			mainProcessFile: 'src/apps/bf_chat-window/background.ts',
			// Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
			rendererProcessFile: 'src/apps/bf_chat-window/main.ts',
			nodeIntegration: true,
			nativeWindowOpen: true
		}
	},
	devServer: {
		port: 5100
	}
};
