import { useMutation, useQuery } from "react-query";

import axiosConfig from "../../configs/axiosConfig";
import { useEffect, useState } from "react";

function BackupList() {
  const [page, setPage] = useState(0);

  const handleBackup = (id) => {
    mutation.mutate({ backConfigId: id });
  };
  const retrieveBackupConfigs = async () => {
    const response = await axiosConfig.get(
      `/backup-config?page=${page}&size=10&sort=id,desc`
    );
    return response.data;
  };

  const doBackup = async (data) => {
    const response = await axiosConfig.post(`/backup-config/create`, data);
    return response.data;
  };
  const mutation = useMutation(doBackup);

  const {
    data: backupConfigData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["backupConfigs", page],
    queryFn: retrieveBackupConfigs,
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      alert("Backup done");
    }
  }, [mutation.isSuccess]);

  if (isLoading) return <div>Fetching Retrieve Backup Configs...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Backup Configs
            </h1>
            <p className="mt-2 text-sm text-gray-700">A list of all Configs</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Config
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Host
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Port
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {backupConfigData.content.map((config) => (
                    <tr key={config.id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                        {config.databaseName}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {config.host}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                        {config.port}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                        {config.username}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                        <button
                          type="button"
                          onClick={() => handleBackup(config.id)}
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Backup
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {backupConfigData.pageable.pageNumber + 1}
                    </span>{" "}
                    to <span className="font-medium">2</span> of{" "}
                    <span className="font-medium">
                      {backupConfigData.totalPages}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <button
                    onClick={() =>
                      handlePageChange(backupConfigData.number - 1)
                    }
                    disabled={backupConfigData.first}
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(backupConfigData.number + 1)
                    }
                    disabled={backupConfigData.last}
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackupList;
