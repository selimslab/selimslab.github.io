from multiprocessing import Process, Queue

class A:
    def __init__(self, x:int) -> None:
        self.x = x


def f(q, a:A):
    print("id", id(a))
    for i in range(10):
        a.x+=1
        q.put(a.x)

if __name__ == '__main__':
    q = Queue()
    a = A(x=2)

    f(q,a)
    f(q,a)

    p1 = Process(target=f, args=(q,a))
    p1.start()

    p2 = Process(target=f, args=(q,a))
    p2.start()

    for i in range(2):
        print(q.get())    # prints "[42, None, 'hello']"

    p1.join()
    p2.join()