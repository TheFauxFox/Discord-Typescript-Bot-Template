import { existsSync, PathLike } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';
import json from 'json-bigint';
import IConfig from '../interfaces/IConfig';

export class ConfigManager {
    path: PathLike;
    config: IConfig;

    constructor(path: PathLike = '') {
        this.path = path;
        this.config = {};
    }

    async load() {
        if (!existsSync(this.path)) {
            await this.save();
        }
        if (existsSync(this.path)) {
            this.config = json.parse((await readFile(this.path)).toString());
        }
    }

    async get<T extends IConfig>(): Promise<T> {
        if (Object.keys(this.config).length === 0) {
            await this.load();
        }
        return <T>this.config;
    }

    async save() {
        if (!existsSync(this.path)) {
            const val = await mkdir(dirname(this.path.toString()), {
                recursive: true,
            });
            if (!val) return;
        }
        await writeFile(this.path, json.stringify(this.config, undefined, 4));
        return true;
    }
}
