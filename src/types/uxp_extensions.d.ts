/**
 *  add by yjt on 20250912
 *  1.由于 uxp 中不包含发送及接收 CSDK 的消息，所以增加该扩展;
 *  2.为 load.js 增加 typescript 的定义
 */

export declare type HostId = "PHSP" | "PHXS" | "IDSN" | "AICY" | "ILST" | "PPRO" | "PRLD" | "AEFT" | "FLPR" | "AUDT" | "DRWV" | "MUSE" | "KBRG" | "RUSH";
declare type HostNameMap = {
    [K in HostId]: string;
};
export declare const HostApplication: Partial<HostNameMap>;

declare type LastErrorResult = number;
declare type ErrorResult = { err: LastErrorResult };

export declare function getLastError(): LastErrorResult;

export declare function getErrorResult(): ErrorResult;

declare type FileEncoding = string; // Encoding.UTF8 | Encoding.Base64

declare interface EncodingConvertion {

    utf8_to_b64(str: string): string;

    b64_to_utf8(base64str: string): string;

    binary_to_b64(binary: string): string;

    b64_to_binary(base64str: string): string;

    ascii_to_b64(ascii: string): string;

    b64_to_ascii(base64str: string): string;
}

declare class Encoding {
    /**
     * @constant UTF8 encoding type.
     */
    readonly UTF8 = "UTF-8";

    /**
     * @constant Base64 encoding type.
     */
    readonly Base64 = "Base64";

    convertion: EncodingConvertion;
}

declare class Util {
    /**
     * @constant Invalid URL.
     */
    readonly ERR_INVALID_URL = 201;

    /**
     * @constant deprecated API.
     */
    readonly DEPRECATED_API = 202;

    /**
     * Opens a page in the default system browser.
     *
     * @param url {string} The URL of the page/file to open, or the email address.
     * Must use HTTP/HTTPS/file/mailto. For example:
     *  "http://www.adobe.com"
     *  "https://github.com"
     *  "file:///C:/log.txt"
     *  "mailto:test@adobe.com"
     *
     * @return {Object} An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_UNKNOWN
     *          <br>ERR_INVALID_PARAMS</li></ul>
     **/
    openURLInDefaultBrowser(url: string): ErrorResult;

    /**
     * Registers a callback function for extension unload. If called more than once,
     * the last callback that is successfully registered is used.
     *
     * @deprecated since version 6.0.0
     *
     * @param callback {function}  The handler function.
     *
     * @return {Object} An object with this property:
     *      <ul><li>"err": The status of the operation, one of:
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS</li></ul>
     **/
    registerExtensionUnloadCallback(callback: Function): { err: LastErrorResult };

    /**
     * Stores the user's proxy credentials
     *
     * @param username {string}  proxy username
     * @param password {string}  proxy password
     *
     * @return {Object} An object with this property:
     *      <ul><li>"err": The status of the operation, one of
     *          <br>NO_ERROR
     *          <br>ERR_INVALID_PARAMS </li>
     *      </ul>
     **/
    storeProxyCredentials(username: string, password: string): ErrorResult;
}

export declare var cep: {
    util: Util,
    encoding: Encoding
};

//---------------------------------------------------------------------------------
/**
 * A standard JavaScript event, the base class for CEP events.
 */
declare class CSEvent {
    type: string;
    appId: string;
    extensionId: string;
    /**
     * Event-specific data.
     */
    data?: any;
    /**
     * @param type          The name of the event type.
     * @param appId         The unique identifier of the application that generated the event.
     * @param extensionId   The unique identifier of the extension that generated the event.
     */
    constructor(type: string, appId: string, extensionId: string);
}
/**
 * Stores window-skin properties, such as color and font. All color parameter values are UIColor objects except that systemHighlightColor is RGBColor object.
 */
interface AppSkinInfo {
    /**
     * The base font family of the application.
     */
    readonly baseFontFamily: string;
    /**
     * The base font size of the application.
     */
    readonly baseFontSize: string;
    /**
     * The application bar background color.
     */
    readonly appBarBackgroundColor: UIColor;
    /**
     * The background color of the extension panel.
     */
    readonly panelBackgroundColor: UIColor;
    /**
     * The application bar background color, as sRGB.
     */
    readonly appBarBackgroundColorSRGB: UIColor;
    /**
     * The background color of the extension panel, as sRGB.
     */
    readonly panelBackgroundColorSRGB: UIColor;
    /**
     * The highlight color of the extension panel, if provided by the host application. Otherwise, the operating-system highlight color.
     */
    readonly systemHighlightColor: UIColor;
}
/**
 * Stores information about the environment in which the extension is loaded.
 */
interface HostEnvironment {
    /**
     * The application's name.
     */
    readonly appName: string;
    /**
     * The application's version.
     */
    readonly appVersion: string;
    /**
     * The application's current license locale.
     */
    readonly appLocale: string;
    /**
     * The application's current UI locale.
     */
    readonly appUILocale: string;
    /**
     * The application's unique identifier.
     */
    readonly appId: string;
    /**
     * True if the application is currently online.
     */
    readonly isAppOnline: boolean;
    /**
     * An AppSkinInfo object containing the application's default color and font styles.
     */
    readonly appSkinInfo: AppSkinInfo;
}

export { CSEvent, AppSkinInfo, HostEnvironment };
