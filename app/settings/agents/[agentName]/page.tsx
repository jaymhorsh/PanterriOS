import { PageHead } from '@/components/shared/dashboard/pageHead';
import AgentSettings from '@/components/settings/AgentSettings';

type Props = {
  params: {
    agentName: string;
  };
};

export default function AgentSettingsPage({ params }: Props) {
  const { agentName } = params;

  return (
    <div className="container mx-auto px-6 py-8">
      <PageHead pageTitle={`${agentName} Settings`} subTitle="Configure platform settings and preferences" />
      <div className="mt-6">
        <AgentSettings agentName={agentName} />
      </div>
    </div>
  );
}
