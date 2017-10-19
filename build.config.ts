/// <reference path="./.jsonenv/_current_result.json.d.ts"/>
import {JsonEnv} from "@gongt/jenv-data";
import {EPlugins, MicroBuildConfig} from "./.micro-build/x/microbuild-config";
import {MicroBuildHelper} from "./.micro-build/x/microbuild-helper";
declare const build: MicroBuildConfig;
declare const helper: MicroBuildHelper;
/*
 +==================================+
 |  **DON'T EDIT ABOVE THIS LINE**  |
 | THIS IS A PLAIN JAVASCRIPT FILE  |
 |   NOT A TYPESCRIPT OR ES6 FILE   |
 |    ES6 FEATURES NOT AVAILABLE    |
 +==================================+
 */

/* Example config file */

const projectName = 'pma';

build.baseImage('nginx', 'alpine');
build.projectName(projectName);
build.domainName(projectName + '.' + JsonEnv.baseDomainName);

build.isInChina(JsonEnv.gfw.isInChina, JsonEnv.gfw);

build.forwardPort(80, 'tcp');
build.listenPort(12806);
build.appendDockerFileContent(`
RUN rm -rf /etc/nginx/conf.d
COPY config/ /etc/nginx/
COPY scripts /data/scripts
`);

build.forceLocalDns(true);
build.startupCommand('./scripts/start');
build.shellCommand('/bin/sh');
build.stopCommand('./scripts/stop');

build.dependService('php-fpm', 'https://github.com/GongT/phpfpm-service.git');

build.noDataCopy();
build.disablePlugin(EPlugins.jenv);

build.volume('document-root', '/data/document-root');
build.environmentVariable('CONFIG_FILE', '/etc/nginx/nginx.conf', true);
build.environmentVariable('CONFIG_FILE', __dirname + '/config/nginx.conf', false);

build.onConfig((isBuild) => {
	process.env.DOCUMENT_ROOT = __dirname + '/document-root';
	process.env.REMOTE_URL = 'http://files.phpmyadmin.net/phpMyAdmin/4.7.4/phpMyAdmin-4.7.4-all-languages.zip';
	process.env.REMOTE_TYPE = 'zip';
	process.env.DOMAIN = projectName + '.' + JsonEnv.baseDomainName;
	process.env.IS_BUILD_MODE = isBuild? 'yes' : '';
	
	const ret = require('child_process').spawnSync(__dirname + '/php-config/create.sh', {
		stdio: 'inherit',
	});
	if (ret.status !== 0) {
		console.error('create.sh failed with %s', ret.status);
		process.exit(ret.status || 1);
	}
	
	const listenPort = isBuild? 80 : 12805;
	const create = require(__dirname + '/php-config/nginx/create.js').createNginxConfig;
	helper.createTextFile(create(
		projectName,
		'/data/document-root',
		'/host' + process.env.DOCUMENT_ROOT,
		listenPort,
	)).save('config/conf.d/01-app.conf');
});
