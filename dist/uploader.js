"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploader = void 0;
class Uploader {
    constructor(file, callback) {
        this.uploader = (file) => __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('files', file);
            return yield fetch(this.url, {
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((data) => data)
                .catch(() => null);
        });
        this.upload = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.file)
                return;
            const files = Array.isArray(this.file) ? (_a = this.file) === null || _a === void 0 ? void 0 : _a[0] : this.file;
            this.uploader(files)
                .then((data) => this.callback && this.callback(data))
                .catch(() => this.callback && this.callback(null));
        });
        this.bulkUpload = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.file)
                return;
            const files = !Array.isArray(this.file) ? [this.file] : this.file;
            const promises = [];
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                promises.push(this.uploader(file));
            }
            Promise.all(promises)
                .then((results) => {
                if ((results === null || results === void 0 ? void 0 : results.length) === 0) {
                    this.callback && this.callback(null);
                    return;
                }
                this.callback && this.callback(results);
            })
                .catch(() => {
                this.callback && this.callback(null);
            });
        });
        this.file = file;
        this.callback = callback;
        this.url = `${process.env.STRAPI_API_URL || 'http://localhost:1337'}/api/upload`;
    }
}
exports.Uploader = Uploader;
