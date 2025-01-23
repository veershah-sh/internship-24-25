import React from "react";

function Card({username="NULL", email="test@google.com", image}) {
    // console.log(props);
    
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          className="size-12 flex-none rounded-full bg-gray-50"
          src={image}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">{username}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {email}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-gray-900">Co-Founder / CEO</p>
        <p className="mt-1 text-xs/5 text-gray-500">
          Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
        </p>
      </div>
    </li>
  );
}

export default Card;
