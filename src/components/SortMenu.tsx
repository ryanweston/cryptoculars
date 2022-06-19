import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import type { Dispatch, SetStateAction } from 'react';
import { Fragment, useState } from 'react';

const SortMenu = ({
  setSort,
  adjustFilter,
}: {
  setSort: Dispatch<SetStateAction<string>>;
  adjustFilter: any;
}) => {
  const [sortOptions, setSortOptions] = useState([
    { name: 'Market cap', url: 'market_cap_', href: '#', current: true },
    { name: 'Alphabetical', url: 'id_', href: '#', current: false },
    { name: 'Volume', url: 'volume_', href: '#', current: false },
  ]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  // find a cleaner way to set current option
  const setCurrent = (index: number, url: string) => {
    const newOptions = sortOptions.filter((item) => {
      if (item.current === true) item.current = false;
      return item;
    });

    newOptions[index].current = true;
    setSortOptions([...newOptions]);

    adjustFilter(() => setSort(url));
  };

  return (
    <Menu as="div" className="relative inline-block">
      <div className="flex">
        <Menu.Button className="group inline-flex justify-center text-sm font-medium px-4 text-white hover:text-white">
          Sort by
          <ChevronDownIcon
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-black ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-800">
          <div className="py-1">
            {sortOptions.map((option, index) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setCurrent(index, option.url);
                    }}
                    className={classNames(
                      option.current ? 'font-medium text-gray-300' : 'text-gray-500',
                      active ? 'bg-gray-800' : '',
                      'block px-4 py-2 text-sm hover:cursor-pointer hover:bg-white hover:text-black w-full text-left',
                    )}
                  >
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortMenu;
