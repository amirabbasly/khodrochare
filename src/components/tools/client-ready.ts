"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
/** Disable form controls until hydration; without JS, no GET submission leaks fields into URLs. */
export function useClientReady() { return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot); }
