// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { Handlers, PageProps } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import type { AccountState } from "./_middleware.ts";
import { BUTTON_STYLES, NOTICE_STYLES } from "@/utils/constants.ts";
import { ComponentChild } from "preact";

export const handler: Handlers<AccountState, AccountState> = {
  GET(_request, ctx) {
    return ctx.render(ctx.state);
  },
};

interface RowProps {
  title: string;
  children?: ComponentChild;
  text: string;
}

function Row(props: RowProps) {
  return (
    <li class="py-4">
      <div class="flex flex-wrap justify-between">
        <span>
          <strong>{props.title}</strong>
        </span>
        {props.children && <span>{props.children}</span>}
      </div>
      <p>
        {props.text}
      </p>
    </li>
  );
}

export default function AccountPage(props: PageProps<AccountState>) {
  const action = props.data.user.isSubscribed ? "Manage" : "Upgrade";

  return (
    <>
      <Head title="Account" href={props.url.href} />
      <Layout session={props.data.sessionId}>
        <div class="max-w-lg m-auto w-full flex-1 p-4 flex flex-col justify-center">
          <img
            src={props.data.user?.avatarUrl}
            alt="User Avatar"
            crossOrigin="anonymous"
            class="max-w-[50%] self-center rounded-full aspect-square mb-4 md:mb-6"
          />
          <h1 class="text-3xl mb-4 text-gray-500 text-center">
            {props.data.user.login}
          </h1>
          <div class="py-4">
            <div class="flex flex-wrap justify-between ">
              <span>
                <strong>Subscription</strong>
              </span>
              <span>
                <a
                  class="underline"
                  href={`/account/${action.toLowerCase()}`}
                >
                  {action}
                </a>
              </span>
            </div>
            <p>
              {props.data.user.isSubscribed ? "Premium 🦕" : "Free"}
            </p>
          </div>
          <a
            href="/logout"
            class={`${BUTTON_STYLES} block text-center mt-8`}
          >
            Logout
          </a>
        </div>
      </Layout>
    </>
  );
}
