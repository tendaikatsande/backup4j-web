import { useQuery } from "react-query";

import axiosConfig from "../../configs/axiosConfig";
import { useState } from "react";

function BackupList() {
  const retrieveBackupConfigs = async () => {
    const response = await axiosConfig.get(
      `/backup-config?page=${page}&size=2&sort=id,desc`
    );
    return response.data;
  };
  const [page, setPage] = useState(0);

  const {
    data: backupConfigData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["backupConfigs", page],
    queryFn: retrieveBackupConfigs,
  });

  if (isLoading) return <div>Fetching Retrieve Backup Configs...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Backup Config List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Host</th>
            <th>Port</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {backupConfigData.content.map((config) => (
            <tr key={config.id}>
              <td>{config.id}</td>
              <td>{config.host}</td>
              <td>{config.port}</td>
              <td>{config.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Page: {backupConfigData.pageable.pageNumber + 1}</p>
        <p>Total Pages: {backupConfigData.totalPages}</p>
        <button
          onClick={() => handlePageChange(backupConfigData.number - 1)}
          disabled={backupConfigData.first}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(backupConfigData.number + 1)}
          disabled={backupConfigData.last}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default BackupList;
