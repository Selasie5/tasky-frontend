import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";  

const Table = () => {
  const GET_TASKS = gql`
  query Tasks {
  tasks {
    deadline
    description
    id
    status
    title
  }
}
`;

  const { data } = useQuery(GET_TASKS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  const formatDeadline = (deadline: string) => {
    if (!deadline) return "No deadline";
  
    // Try parsing as ISO string first (common GraphQL format)
    let date = new Date(deadline);
    
    // If that fails, try parsing as timestamp (number string)
    if (isNaN(date.getTime())) {
      date = new Date(parseInt(deadline));
    }
    
    // If still invalid, try removing timezone info if present
    if (isNaN(date.getTime())) {
      const isoWithoutTimezone = deadline.split('+')[0].split('Z')[0];
      date = new Date(isoWithoutTimezone);
    }
  
    // Final fallback
    if (isNaN(date.getTime())) {
      console.warn("Invalid date format:", deadline);
      return "Invalid date";
    }
  
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-sm">
      {data?.tasks.length > 0 ? (
        <table className="w-full border border-gray-200 rounded-sm">
          <thead className="border-b border-b-gray-200 w-full text-md text-gray-500 uppercase ">
            <tr className="bg-gray-100 ">
              <th className="p-4 text-left font-normal">Title</th>
              <th className="p-4 text-left font-normal">Description</th>
              <th className="p-4 text-left font-normal">Status</th>
              <th className="p-4 text-left font-normal">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {data.tasks.map((task: any) => (
              <tr key={task.id} className="border-b border-b-gray-200 py-4">
                <td className="p-4">{task.title}</td>
                <td className="p-4">{task.description}</td>
                <td className="p-4">{task.status}</td>
                <td className="p-4">{formatDeadline(task.deadline)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">No tasks available</p>
        </div>
      )}
    </div>
  );
};

export default Table;
