import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

function HintDisclosure({ hints }: { hints: string[] }) {
  return (
    <div className="divide-y divide-gray-200 border-t border-b mt-5">
      {hints.map((hint, index) => (
        <Disclosure as="div" key={index}>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-2 text-left">
                  <span className="text-sm font-medium text-gray-400">
                    hint
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon
                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusIcon
                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="prose prose-sm pb-2">
                <p className="text-sm font-medium"> {hint}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default HintDisclosure;
