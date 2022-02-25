import {
  UriResolver_MaybeUriOrManifest,
  Input_tryResolveUri,
  Input_getFile
} from "./w3";

export function tryResolveUri(input: Input_tryResolveUri): UriResolver_MaybeUriOrManifest {
  //Do something here
  return {
    uri: null,
    manifest: null
  };
}

export function getFile(input: Input_getFile): ArrayBuffer | null {
  // Do Something
  return null;
}
