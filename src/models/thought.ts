import { Schema, model, Document, Types } from 'mongoose';
import moment from 'moment';

// Reaction subdocument schema
interface Reaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

const reactionSchema = new Schema<Reaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal: Date) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

interface Thought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: Reaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<Thought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal: Date) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model<Thought>('Thought', thoughtSchema);
export default Thought;
