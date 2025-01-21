import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ListChecks, FileText } from 'lucide-react';

const SummaryView = ({ summary }) => {
  return (
    <div className="mt-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <CardTitle>Document Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">Key Points</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold">Main Ideas</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {summary.mainIdeas.map((idea, index) => (
                  <li key={index} className="text-gray-700">{idea}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Full Summary</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {summary.fullSummary}
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryView;